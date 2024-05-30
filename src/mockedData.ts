import { faker } from '@faker-js/faker';

export type TStatus = {
  id: number;
  name: string;
  color: string;
};

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: TStatus;
  subRows?: Person[];
};

const STATUS_RELATIONSHIP = { id: 1, name: 'Relationship', color: 'blue.300' };
const STATUS_COMPLICATED = {
  id: 2,
  name: 'Complicated',
  color: 'yellow.400',
};
const STATUS_SINGLE = { id: 3, name: 'Single', color: 'pink.300' };
export const STATUSES = [
  STATUS_RELATIONSHIP,
  STATUS_COMPLICATED,
  STATUS_SINGLE,
];

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): any => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    due: faker.date.past(),
    visits: faker.number.int(1000),
    applied: faker.datatype.boolean(),
    status: faker.helpers.shuffle<Person['status']>([
      STATUS_RELATIONSHIP,
      STATUS_COMPLICATED,
      STATUS_SINGLE,
    ])[0]!,
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
