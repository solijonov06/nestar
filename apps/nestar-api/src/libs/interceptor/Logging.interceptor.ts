// import { CallHandler, Injectable, Logger, NestInterceptor,ExecutionContext } from "@nestjs/common";
// import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
// import { Observable, tap } from "rxjs";



// @Injectable()
// export class LoggingInterceptor implements NestInterceptor{
//     private readonly logger: Logger  = new Logger()
    
//     intercept(context: ExecutionContext, next: CallHandler) : Observable<any>{
//         const recordTime = Date.now();
//         const requestType = context.getType<GqlContextType>();
        

//         if(requestType === 'http'){
//             // Develop if needed
//         }else if(requestType === 'graphql'){
//             /**Print request */
//             const gqlContext = GqlExecutionContext.create(context);
//             // console.log("gqlContext",gqlContext.getContext().req.body); 
//             this.logger.log(`Type, ${this.stringify(gqlContext.getContext().req.body)}`, `Request` )
//             /**Error handling via graphql */

//             /**NO errors, giving response Below */
//         return next.handle().pipe
//         (tap((context)=>{
//             const responseTime =Date.now() - recordTime;
//         this.logger.log(`${this.stringify(context)}-${responseTime}ms \n\n`, `RESPONSE`)
//                 } 
//               )
//             )
//         }
//     }

//     private stringify(context: ExecutionContext):string{
//         console.log(typeof context)
//         return JSON.stringify(context).slice(0,85);

//     }
// }


import { CallHandler, Injectable, Logger, NestInterceptor, ExecutionContext } from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { Observable, tap, catchError } from "rxjs";
import { throwError } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger: Logger = new Logger();
    
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const recordTime = Date.now();
        const requestType = context.getType<GqlContextType>();
        
        if (requestType === 'http') {
            // Develop if needed
        } else if (requestType === 'graphql') {
            /**Print request */
            const gqlContext = GqlExecutionContext.create(context);
            
            // CHANGED: Remove the 75 character limit to see full request
            this.logger.log(`${this.stringify(gqlContext.getContext().req.body)}`, `Request`);
            
            /**Error handling via graphql */
            return next.handle().pipe(
                tap((context) => {
                    const responseTime = Date.now() - recordTime;
                    this.logger.log(`${this.stringify(context)} - ${responseTime}ms \n\n`, `RESPONSE`);
                }),
                // ADD: Catch errors and log them with full details
                catchError((error) => {
                    const responseTime = Date.now() - recordTime;
                    this.logger.error(
                        `Error after ${responseTime}ms: ${JSON.stringify(error, null, 2)}`,
                        error.stack,
                        'Request Error'
                    );
                    return throwError(() => error);
                })
            );
        }
    }

    private stringify(context: any): string {
        // CHANGED: Remove the slice limit or make it much larger
        return JSON.stringify(context, null, 2); // Pretty print with indentation
        // OR if you want a limit, make it reasonable:
        // return JSON.stringify(context).slice(0, 2000);
    }
}