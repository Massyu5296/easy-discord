import { BaseButton } from '../types/BaseButton';
import root from 'app-root-path';
import { readdir } from 'fs/promises';

export const getButtons = async (): Promise<BaseButton[]> => {
  const path = `${root}/dist/buttons/`;

  try {
    return await Promise.all(
      (
        await readdir(path)
      ).map(async (fileName) => {
        const { default: button }: { default: BaseButton } = await import(
          `${path}/${fileName}`
        );

        return button;
      }),
    );
  } catch (error) {
    return [];
  }
};