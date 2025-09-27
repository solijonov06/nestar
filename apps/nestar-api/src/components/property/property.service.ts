import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../../libs/enums/common.enum';
import { PropertyInput } from '../../libs/dto/property/property.input';
import { Property } from '../../libs/dto/property/property';
import { MemberService } from '../member/member.service';

@Injectable()
export class PropertyService {
    constructor(@InjectModel('Property') private readonly propertyModel: Model<Property>,
    private memberServie: MemberService){}
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
}
