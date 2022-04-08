Request updated

NestJS Recap Hello
1. Modules(nest generate module) organize and establish clear boundaries, grouping related Controller/Resolver/Services together
2. Controller(nest generate controller) defining REST endpoints
3. Resolver(nest generate resolver) defining GraphQL queries/mutations/subscriptions
4. Services(nest generate service) implement and isolate business logic

https://docs.nestjs.com/recipes/prisma
1. npm install -g @nestjs/cli
2. nest new hello-prisma

3. cd hello-prisma
4. npm install prisma --save-dev

5. npx prisma
6. npx prisma init

//after add models into prisma schema
7. npx prisma migrate dev --name init

8. npm install @prisma/client
//if you make any changes to the schema, you need to generate Prisma Client again
9. npx prisma generate


//Generate Controller and service
10. nest g controller items
11. nest g s feed/services/feed --flat --no-spec


//Testing
1. npm i class-validator

1. generate specs copy/paste or call nest g c post
2. add the service, override with an empty object
questions:
1. What does ? mark mean in prisma model?
2. In User Service, what does UserSelect and UserWhereUniqueInput mean/do?