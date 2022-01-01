import { EntityDataModuleConfig, EntityMetadataMap } from "@ngrx/data";

const entityMetaData: EntityMetadataMap = {
  Post: {
    entityDispatcherOptions: {
      //Adding this which prevents it to wait for get data from backend and updates directly as its in front end
      optimisticUpdate: true,
      //If we keep this false you will observe that it waits until it is deleted from backend
      //But keeping it true deletes it right away and do not wait
      optimisticDelete: true,
      // we should not use this as we know the id gets generated form backend and cannot depend on front end hence should not use it.
      // optimisticAdd: true,
    }
  },
}

//because the plural of "hero" is not " heroes"
// const pluralNames = { Hero: 'Heroes'};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata: entityMetaData,
}
