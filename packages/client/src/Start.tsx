import { useEntityQuery } from "@latticexyz/react";
import { getComponentValueStrict, Has } from "@latticexyz/recs";
import { Coord, Game } from "./Game";
import { useMUD } from "./MUDContext";

export const Start = () => {
  const {
    api: { setMap },
    components: { Map },
  } = useMUD();

  const entities = useEntityQuery([Has(Map)]);

  const maps: Array<Array<Coord>> = entities.map((entity) => {
    const cs = getComponentValueStrict(Map, entity);

    return cs.xs.map((x, i) => ({
      x,
      y: cs.ys[i],
    }));
  });

  return (
    <div className="flex h-96 w-full">
      {maps.length > 0 ? (
        <Game colliders={maps[0]} />
      ) : (
        <div className="w-full text-center">
          <div>no maps!</div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() =>
              setMap([
                { x: 2, y: 2 },
                { x: 2, y: 3 },
                { x: -1, y: -1 },
              ])
            }
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
};