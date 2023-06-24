/// <reference types="satchel.d.ts" />


// TODO: ps - The reference paths are used so the compiler can aggregate the namespace declarations. Still need to nest the namespaces in code (I think.)
namespace Satchel {
  export namespace Grid {

    // Type of array indice subclasses/extends from SatchelNode.
    interface GridNodes<T extends Node> {}


    interface Node {
      id: number,
    }

    interface GridContainer {
      readonly dimensions: Coordinate; // TODO: readonly doesn't allow inventory expansion later.
      nodes: GridNodes<SatchelNode>;
    }
  }
}
