 import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Message } from '../../libs/enums/common.enum';
import { PropertyInput } from '../../libs/dto/property/property.input';
import { Property } from '../../libs/dto/property/property';
import { MemberService } from '../member/member.service';
import { ViewService } from '../view/view.service';
import { PropertyStatus } from '../../libs/enums/property.enum';
import { StatisticModifier, T } from '../../libs/types/common';
import { ViewGroup } from '../../libs/enums/view.enum';
import * as moment from "moment"
import { PropertyUpdate } from '../../libs/dto/property/property.update';

@Injectable()
export class PropertyService {
    constructor(@InjectModel('Property') private readonly propertyModel: Model<Property>,
    private memberServie: MemberService,
    private viewService: ViewService){}
    public async createProperty(input: PropertyInput ): Promise<Property>{
        try{
        console.log('Mutation: login'); 
            const result = await this.propertyModel.create(input);
                //increase member properties
                await this.memberServie.memberStatsEditor({_id: result.memberId, 
                targetKey: 'memberProperties', modifier: 1 })
            return result;
        }catch(err){
        console.log('Error: Service model createProperty');
        throw new BadRequestException(Message.CREATE_FAILED)
       
        }
    }

    public async getProperty(memberId: ObjectId, propertyId: ObjectId) :Promise<Property>{
        const search: T = {
            _id: propertyId,
            propertyStatus: PropertyStatus.ACTIVE
        }

        const targetProperty: Property =  await this.propertyModel.findOne(search).lean().exec()
        if(!targetProperty) throw new InternalServerErrorException(Message.NO_DATA_FOUND)

       if (memberId) {
                //record view 
                const viweInput = { memberId: memberId, viewRefId: propertyId, viewGroup: ViewGroup.PROPERTY }
                const newView = await this.viewService.recordView(viweInput)
                if (newView) {
                    //increase MemberView
                    await this.propertyStatsEditor({
                        _id: propertyId,
                        targetKey: 'propertyViews',
                        modifier: 1
                    } )
                    targetProperty.propertyViews++;
                }
            }
            //meLiked
            //meFollowed
            targetProperty.memberData = await this.memberServie.getMember(null,targetProperty.memberId)
            return targetProperty;
        }

            public async propertyStatsEditor(input: StatisticModifier): Promise<Property> {
                const {_id, targetKey, modifier} = input
                return await this.propertyModel.findByIdAndUpdate(_id,
                     {$inc: {[targetKey]: modifier}}, {new: true}).exec();
                
            }

            public async updateProperty(memberId: ObjectId, input: PropertyUpdate): Promise<Property> {
                let {propertyStatus, soldAt,deletedAt}  =  input;
                const search: T ={
                    _id: input._id,
                    memberId: memberId,
                    propertyStatus:PropertyStatus.ACTIVE
                }

                if(propertyStatus === PropertyStatus.SOLD)soldAt= moment().toDate()
                else if (propertyStatus === PropertyStatus.DELETE) deletedAt = moment().toDate()
                                
                const result = await this.propertyModel.findOneAndUpdate(
                    
                    search,
                    input,
                    {
                      new: true
                    }
                  )
                  .exec();
                    console.log('executedservice')
            
            
                  if (!result) throw new InternalServerErrorException(Message.UPLOAD_FAILED);
            if (soldAt || deletedAt){
                await this.memberServie.memberStatsEditor({
                    _id: memberId,
                    targetKey: "memberProperties",
                    modifier: -1
                })
            }
                    return result;
                }
            
    }

