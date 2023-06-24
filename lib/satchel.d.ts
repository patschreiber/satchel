declare namespace Satchel {
  import { v4 as uuidv4 } from 'uuid';

  type Coordinate = [number, number];

  // Wrap the dep so it's swappable l8r.
  type uuid = uuidv4;

  type Container = {
    id: uuid
  }
}
