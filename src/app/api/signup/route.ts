// import bcrypt from "bcrypt";
// import { NextResponse } from "next/server";

// import prisma from "@/../prisma/client";

// export async function POST(request) {
//   const body = await request.json();
//   const { name, username, email, password } = body;

//   //server side validation TODO

//   const emailExist = await prisma.user.findUnique({ where: { email } });
//   const usernameExist = await prisma.user.findUnique({ where: { username } });

//   if (emailExist || usernameExist) {
//     return new NextResponse(
//       JSON.stringify({
//         message: "User with following email/username already exist",
//       }),
//       { status: 409 }
//     );
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const createdUser = await prisma.user.create({
//     data: {
//       name,
//       username,
//       email,
//       password: hashedPassword,
//     },
//   });

//   return NextResponse.json(createdUser);
// }
