import { Amiibo } from './amiibo.entity';

export function addAmiiboUtil(amiibos: Amiibo[]) {
  const newAmiibo: Amiibo = {
    id:
      amiibos
        .map((p) => p.id)
        .reduce((max, a) => (max = a > max ? a : max), 0) + 1,
    name: 'New Amiibo',
    age: 0,
    type: 'unknown',
    inMemory: true,
  };

  return [...amiibos, newAmiibo];
}

export function mapPhotos(amiibos: Amiibo[]) {
  return amiibos.map((p) => {
    return { ...p, photo: p.inMemory ? 'default.jpg' : `${p.id}.jpg` };
  });
}

export function deleteAmiiboUtil(amiibos: Amiibo[], id: number) {
  return amiibos.map((p) => {
    return { ...p, deleted: p.deleted || p.id == id };
  });
}

export function updateAmiiboUtil(
  amiibos: Amiibo[],
  id: number | null | undefined,
  name: string,
  age: number,
  species: string
): Amiibo[] {
  if (!id) return amiibos;

  const toUpdate = amiibos.find((p) => p.id == id);
  if (!toUpdate) return amiibos;

  return [
    ...amiibos.filter((p) => p.id != id),
    {
      ...toUpdate,
      name: name,
      age: age,
      type: species,
    },
  ];
}
