import { Amiibo } from './amiibo.entity';

export function deleteAmiiboUtil(
  amiibos: Amiibo[],
  head: string,
  tail: string
) {
  return amiibos.map((a) => {
    return { ...a, deleted: a.deleted || (a.head === head && a.tail === tail) };
  });
}
