import React, { useRef } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { XYCoord } from "dnd-core";

/**
 * Used to infer which dimension to utilize when to detecting sorting.
 */
type SortDirection = "vertical" | "horizontal";

export type OnSortCallback = (
  dragId: string,
  dragIndex: number,
  hoverIndex: number
) => void;

export interface SortableCallbacks {
  /**
   * A callback that is fired when the item position has
   * been updated via drag but not necessarily dropped.
   */
  onSort: OnSortCallback;
  /**
   * A callback that is fired when the item has been dropped.
   * This is useful if you want to make a network update to
   * persist any changes on the updated sort order.
   */
  onFinishSort: () => void;
}

export interface SortableProps extends SortableCallbacks {
  /**
   * The unique identifier for this specific item.
   */
  id: string;
  /**
   * The type of draggable. This should be a unique constant
   * and is used to determine how the item should be treated
   * when hovering or dropped.
   */
  type: string;
  /**
   * An optional override to customize the accept value of
   * reactDnD. Otherwise, this will default to the type.
   */
  accept?: string | string[];
  /**
   * The current index of this item within its siblings.
   */
  index: number;
  /**
   * The direction sorting should occur. For example, a typical
   * list would use vertical sorting but if you had a gallery
   * or grid arrangement you'd want to use horizontal.
   */
  sortDirection?: SortDirection;
  /**
   * If an item is disabled it cannot be a drop target.
   */
  disabled?: boolean;
}

/**
 * A container that allows the child component to use drag
 * and drop for simple sorting.
 * @param props Props for this component.
 */
export const Sortable: React.FC<SortableProps> = ({
  id,
  onFinishSort,
  onSort,
  index,
  type,
  accept = type,
  children,
  sortDirection,
  disabled = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop(
    () => ({
      accept,
      canDrop() {
        const enabled = disabled ?? true;
        return enabled;
      },
      hover(item: SortableProps, monitor: DropTargetMonitor) {
        const node = ref.current;
        if (!node) {
          return null;
        }

        const dragIndex = item.index;
        const hoverIndex = index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = node.getBoundingClientRect();

        // Get upper / left bound
        const hoverMiddle = {
          x: (hoverBoundingRect.right - hoverBoundingRect.left) / 2,
          y: (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2,
        };

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClient = {
          x: (clientOffset as XYCoord).x - hoverBoundingRect.left,
          y: (clientOffset as XYCoord).y - hoverBoundingRect.top,
        };

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Only perform the move when the mouse has crossed half of the items width
        // When dragging downward/rightward, only move when the cursor is to the below/right of 50%
        // When dragging upward/leftward, only move when the cursor is above/left of 50%

        // Dragging right or down
        if (
          dragIndex < hoverIndex && sortDirection === "horizontal"
            ? hoverClient.x < hoverMiddle.x
            : hoverClient.y < hoverMiddle.y
        ) {
          return;
        }

        // Dragging left or up
        if (
          dragIndex > hoverIndex && sortDirection === "horizontal"
            ? hoverClient.x > hoverMiddle.x
            : hoverClient.y > hoverMiddle.y
        ) {
          return;
        }

        // Time to actually perform the action
        onSort(item.id, dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem<SortableProps>().index = hoverIndex;
      },
    }),
    [disabled, index]
  );

  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { type, id, index, onSort, onFinishSort, disabled },
    end: (dropResult?: SortableProps) => {
      dropResult?.onFinishSort();
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // Hook up the drag and drop actions to a reference of
  // our container object.
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {children}
    </div>
  );
};

Sortable.displayName = "Behavior.Sortable";
