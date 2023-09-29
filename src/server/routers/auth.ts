import { procedure, router } from "./../trpc";
import bcrypt from "bcrypt";

import prisma from "@/../prisma/client";

import { signUpSchema } from "@/app/(auth)/signup/validation";

export const authRouter = router({
  signup: procedure.input(signUpSchema).mutation(async (opts) => {
    const { username, name, email, password, confirmPassword } = opts.input;

    //server side validation TODO

    const emailExist = await prisma.user.findUnique({ where: { email } });
    const usernameExist = await prisma.user.findUnique({ where: { username } });

    if (emailExist || usernameExist) {
      return (
        JSON.stringify({
          message: "User with following email/username already exist",
        }),
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    return createdUser;
  }),
});

export type AuthRouter = typeof authRouter;
