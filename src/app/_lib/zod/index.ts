import { defaultErrorMap, z } from "zod";
import { polishErrorMap } from "./errorMap";

export const setZodErrorMap = (locale: string) => {
  if (locale === "pl") z.setErrorMap(polishErrorMap);
  else z.setErrorMap(defaultErrorMap);
};
