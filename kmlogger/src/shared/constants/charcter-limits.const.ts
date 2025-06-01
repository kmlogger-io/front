import type { CharacterLimit } from "../components/input/types/input.types";

export const EMAIL_CHARACTER_LIMIT: CharacterLimit = {
  maximum: 100,
  warningAt: 230,
};

export const PASSWORD_CHARACTER_LIMIT: CharacterLimit = {
  minimum: 8,
  maximum: 20,
  warningAt: 100,
};

