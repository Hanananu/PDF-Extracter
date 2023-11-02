import { v4 as uuidv4 } from 'uuid';

export function generateUniqueFileName(extension = '') {
  const uniqueFileName = `${uuidv4()}${extension ? `.${extension}` : ''}`;
  return uniqueFileName;
}
