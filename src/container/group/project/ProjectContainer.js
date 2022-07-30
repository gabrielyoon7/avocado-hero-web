import { useState } from "react"

export default () => {
    const [notices, setNotices] = useState([ //공지사항 배열
        {
            _id: 0,
            title: "콘솔",
            description: "상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 ",
        },
        {
            _id: 1,
            title: "콘솔",
            description: "상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 ",
        },
        {
            _id: 2,
            title: "콘솔",
            description: "상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 ",
        },
        {
            _id: 3,
            title: "콘솔",
            description: "상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 상세설명 ",
        },
    ]);

    const [title, setTitle] = useState(""); //공지사항 제목
    const [description, setDescription] = useState(""); //공지사항 내용
    const [id, setId] = useState(4); //추후 0으로 교체
    const [isEdit, setIsEdit] = useState(false); //수정 모드 여부
    const [key, setKey] = useState(-1); //수정할 공지의 id

    const saveNewNotice = () => {
        const newNotice = {_id: id, title: title, description: description};
        setNotices([newNotice, ...notices]);
        setId(id + 1);
        setTitle("");
        setDescription("");
    }

    const deleteNotice = (id) => {
        setNotices(notices.filter((notice) => notice._id !== id));
    }

    const showModifyModal = (notice) => {
        setTitle(notice.title);
        setDescription(notice.description);
        setKey(notice._id);
        setIsEdit(true);
    }

    const modifyNotice = () => {
        setNotices(notices.map((notice) => notice._id === key ? {...notice, title: title, description: description} : notice));
        setTitle("");
        setDescription("");
        setKey(0);
        setIsEdit(false);
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">공지사항</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2">
                        <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                    </div>
                    {/* 공지사항 추가하기는 추후 팀장만 볼 수 있게 수정 */}
                    <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                        공지사항 추가하기
                    </button>
                </div>
            </div>

            <div className="accordion mb-3" id="accordionPanelsStayOpenExample">
                {notices.map((notice) => (
                    <div className="accordion-item" key={notice._id} id={"panelsStayOpen-heading" + notice._id}>
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#panelsStayOpen-collapse" + notice._id} aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                {notice.title}
                            </button>
                        </h2>
                        <div id={"panelsStayOpen-collapse" + notice._id} className="accordion-collapse collapse show" aria-labelledby={"panelsStayOpen-heading" + notice._id}>
                            <div className="accordion-body">
                                <div>{notice.description}</div>
                                {/* 수정 삭제는 추후 팀장만 볼 수 있게 수정 */}
                                <div className="d-flex justify-content-end">
                                    <button type="button" className="btn btn-secondary me-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => showModifyModal(notice)} >수정</button>
                                    <button type="button" className="btn btn-danger" onClick={() => deleteNotice(notice._id)} >삭제</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">새 공지사항</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">제목</label>
                                    <input type="text" class="form-control" id="recipient-name" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div class="mb-3">
                                    <label for="message-text" class="col-form-label">내용</label>
                                    <textarea class="form-control" id="message-text" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                            {isEdit ? <button type="button" class="btn btn-primary" onClick={() => modifyNotice()} data-bs-dismiss="modal">수정</button> 
                            : <button type="button" class="btn btn-primary" onClick={() => saveNewNotice()} data-bs-dismiss="modal">저장</button>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}