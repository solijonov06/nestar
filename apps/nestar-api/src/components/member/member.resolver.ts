import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { InternalServerErrorException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Member } from '../../libs/dto/member/member';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';

@Resolver()
export class MemberResolver {
    constructor (private readonly memberService: MemberService){}

    @Mutation(()=> Member)
    @UsePipes(ValidationPipe)
    public async signup(@Args('input') input: MemberInput): Promise<Member>{
        try{
          console.log("Mutation: signup");
        console.log('input', input)
        return this.memberService.signup(input);

        }catch(err){
          console.log('Error, signup', err);
          throw new InternalServerErrorException(err)
        }
    }

  @Mutation(()=> Member)
    public async login(@Args ('input')input : LoginInput): Promise<Member>{
         try{
        console.log("Mutation: login");
        return this.memberService.login(input);


        }catch(err){
          console.log('Error, signup', err);
          throw new InternalServerErrorException(err)
        }
    }
//authentication
  @UseGuards(AuthGuard)
  @Mutation(()=> String)
    public async updateMember(@AuthMember('_id') memberId: ObjectId): Promise<string>{
        console.log("Mutation: updateMember");
        console.log(memberId)
        return this.memberService.updateMember();
    }


     @UseGuards(AuthGuard)
  @Query(()=> String)
    public async checkUpdateMember(@AuthMember('memberNick') memberNick: string): Promise<string>{
        console.log("Query: checkUpdateMember");
        console.log(memberNick)
        return ''
    }


  @Query(()=> String)
    public async getMember(): Promise<string>{
        console.log("Mutation: getMember");
        return this.memberService.getMember();
    }

    /**ADMIN */
    //authorization: Admin
    @Mutation(()=> String)
    public async getAllMembersByAdmin(): Promise<string>{
       return this.memberService.getAllMembersByAdmin();
    }
  
     //authorization: Admin
    @Mutation(()=> String)
    public async updateMemberByAdmin(): Promise<string>{
        console.log("Mutation: updateMemberByAdmin");
     return this.memberService.updateMemberByAdmin();
    }
  }

