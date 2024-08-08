import Airtable, { type FieldSet, type Records } from 'airtable';

const airtableToken =
  'patdwE10W5YOIwOla.4a633223c06422d5a54fdcc94b427170221e267365c08a0e0f9a894cffad3904';

Airtable.configure({ apiKey: airtableToken });

const baseInstance = new Airtable().base('appRQPFdsg8bGEHBO');

const secondBaseInstance = new Airtable().base('appQLE45fhEqD8Nq8');

const third_base_instance = new Airtable().base('appoMFLpUmTA8ebnD');

export const getTableRecord = function (tableId: string) {
  return baseInstance(tableId).select({
    view: 'Grid view',
  });
};

export const getTableRecordSecondBase = function (tableId: string) {
  return secondBaseInstance(tableId).select({
    view: 'Grid view',
  });
};

export const getTable_record_thirdbase = function (tableId: string) {
  return third_base_instance(tableId).select({
    view: 'Grid view',
  });
};
