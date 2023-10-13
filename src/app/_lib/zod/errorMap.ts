import { ZodIssueCode, ZodParsedType, util, z } from "zod";

// adapted form package src
export const polishErrorMap: z.ZodErrorMap = (issue, _ctx) => {
  let message: string;

  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Wymagany";
      } else {
        message = `Oczekiwano ${issue.expected}, otrzymano ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Błędna wartość literału, oczekiwano ${JSON.stringify(
        issue.expected,
        util.jsonStringifyReplacer
      )}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Nierozpoznany/e klucz/e w obiekcie : ${util.joinValues(
        issue.keys,
        ", "
      )}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Błędne dane`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Błędna wartość dyskryminatora. Oczekiwano ${util.joinValues(
        issue.options
      )}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Błędna wartość enuma. Oczekiwano ${util.joinValues(
        issue.options
      )}, otrzymano '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Błędne argumenty funkcji`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Nieprawidłowy typ zwrotny funkcji`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Nieprawidłowa data`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Błędne dane: musi zawierać "${issue.validation.includes}"`;

          if (typeof issue.validation.position === "number") {
            message = `${message} na jednej lub kilku pozycji/ach większa lub równa ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Nieprawidłowe dane: musi zaczynać się z "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Nieprawidłowe dane: musi kończyć się z "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Nieprawidłowy ${issue.validation}`;
      } else {
        message = "Nieprawidłowy";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Tablica musi zawierać ${
          issue.exact
            ? "dokładnie"
            : issue.inclusive
            ? `przynajmniej`
            : `więcej niż`
        } ${issue.minimum} element/ów`;
      else if (issue.type === "string")
        message = `Pole musi zawierać ${
          issue.exact ? "dokładnie" : issue.inclusive ? `przynajmniej` : `ponad`
        } ${issue.minimum} znak${
          issue.minimum === 1 ? "" : issue.minimum < 5 ? "i" : "ów"
        }`;
      else if (issue.type === "number")
        message = `Numer musi być ${
          issue.exact
            ? `dokładnie równy `
            : issue.inclusive
            ? `większy lub równy `
            : `większy niż `
        }${issue.minimum}`;
      else if (issue.type === "date")
        message = `Data musi ${
          issue.exact
            ? `dokładnie równe `
            : issue.inclusive
            ? `większy niż lub równy `
            : `większy niż `
        }${new Date(Number(issue.minimum))}`;
      else message = "Nieprawidłowe dane";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Tablica musi zawierać ${
          issue.exact
            ? `dokładnie`
            : issue.inclusive
            ? `najwięcej`
            : `mniej niż`
        } ${issue.maximum} element/y`;
      else if (issue.type === "string")
        message = `Pole musi zawierać ${
          issue.exact ? `dokładnie` : issue.inclusive ? `najwięcej` : `poniżej`
        } ${issue.maximum} znak/ów`;
      else if (issue.type === "number")
        message = `Numer musi być ${
          issue.exact
            ? `dokładnie`
            : issue.inclusive
            ? `mniej niż lub równe`
            : `mniej niż`
        } ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt musi być ${
          issue.exact
            ? `dokładnie`
            : issue.inclusive
            ? `mniej niż lub równy`
            : `mniej niż`
        } ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Data musi być ${
          issue.exact
            ? `dokładnie`
            : issue.inclusive
            ? `mniejszy niż lub równy`
            : `mniejszy niż`
        } ${new Date(Number(issue.maximum))}`;
      else message = "Nieprawidłowe dane";
      break;
    case ZodIssueCode.custom:
      message = `Nieprawidłowe dane`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Resultaty intersekcji nie mogą być połączone`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Numer musi być wielokrotnością ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Numer musi być skończony";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }

  return { message };
};
