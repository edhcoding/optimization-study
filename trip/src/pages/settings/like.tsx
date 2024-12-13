import useEditLike from '@/components/settings/like/hooks/useEditLike'
import ListRow from '@/components/shared/ListRow'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd'
import FixedButton from '@/components/shared/FixedButton'

export default function LikePage() {
  const { data, isEdit, reorder, save } = useEditLike()

  const handleDragEndDrop = (result: DropResult) => {
    // 결과값의 목적지가 없으면 아무것도 하지 않음
    if (result.destination == null) return

    const from = result.source.index
    const to = result.destination.index

    reorder(from, to)
  }

  return (
    <div>
      {/* onDragEnd는 dnd가 끝난 후 발동할 함수 */}
      <DragDropContext onDragEnd={handleDragEndDrop}>
        {/* Droppable : 드래그 앤 드롭 가능한 컴포넌트 */}
        <Droppable droppableId="likes">
          {(droppableProps) => (
            <ul
              ref={droppableProps.innerRef}
              {...droppableProps.droppableProps}
            >
              {data?.map((like, i) => (
                <Draggable key={like.id} draggableId={like.id} index={i}>
                  {(draggableProps) => (
                    <li
                      ref={draggableProps.innerRef}
                      {...draggableProps.draggableProps}
                      {...draggableProps.dragHandleProps}
                    >
                      <ListRow
                        as="div"
                        contents={
                          <ListRow.Texts
                            title={like.order}
                            subTitle={like.hotelName}
                          />
                        }
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {droppableProps.placeholder} {/* 이 부분을 추가해주세요 */}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      {isEdit ? <FixedButton label="저장하기" onClick={save} /> : null}
    </div>
  )
}

// Droppable이 react18의 strict mode에서 문제가 있어서
// Droppable을 그리는 시점을 애니메이션 프레임 뒤쪽으로 밀어 줘야함
// 애니메이션 프레임 뒤쪽에 그려주기로 했으니까 state로 판단해볼거임
// function StrictModeDroppable({ children, ...props }: DroppableProps) {
//   const [enabled, setEnabled] = useState<boolean>(false)

//   useEffect(() => {
//     const animation = requestAnimationFrame(() => setEnabled(true))

//     return () => {
//       cancelAnimationFrame(animation)
//       setEnabled(false)
//     }
//   }, [])

//   if (enabled === false) return null

//   return <Droppable {...props}>{children}</Droppable>
// }
