import { EntityDataModuleConfig, EntityMetadataMap } from "@ngrx/data";

const entityMetaData: EntityMetadataMap = {
  Post: {},
}

//because the plural of "hero" is not " heroes"
// const pluralNames = { Hero: 'Heroes'};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata: entityMetaData,
}
