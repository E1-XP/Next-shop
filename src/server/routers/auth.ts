import { TRPCError } from "@trpc/server";
import { procedure, router } from "./../trpc";
import bcrypt from "bcrypt";

import prisma from "@/../prisma/client";

import { signUpSchema } from "@/app/[locale]/(auth)/signup/validation";

export const authRouter = router({
  signup: procedure.input(signUpSchema).mutation(async (opts) => {
    const { username, name, email, password, confirmPassword } = opts.input;

    const emailExist = await prisma.user.findUnique({ where: { email } });
    const usernameExist = await prisma.user.findUnique({ where: { username } });

    if (emailExist) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "User with following email already exist",
      });
    }

    if (usernameExist) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "User with following username already exist",
      });
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
