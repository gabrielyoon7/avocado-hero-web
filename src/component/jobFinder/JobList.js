import JobPostingCard from "../../container/jobFinder/JobPostingCard"
import { useEffect, useState } from "react"
import axios from "axios";
import { BiBookmark } from "react-icons/bi";


export default (props) => {

    const [selected, setSelected] = useState(null);

    const onClick = (e) => {
        window.location.href = "/jobFinder";
        alert("지원이 완료되었습니다.");
    }

    const bookMark = (company_id) => {
        // window.location.href = "/jobFinder";

        axios
            .post("/bookmarksRouter/bookmarkSave", {
                user_id: props.userInfo.user_id,
                company_id: company_id,
            })
            .then((response) => {
                console.log(response.data);
                alert("북마크에 추가되었습니다.");
                window.location.href = "/jobFinder";
            })
            .catch(function (error) {
                console.log(error);
            });
    }
        
    return (
        <>
            <div>
                {
                    props.postings.length > 0
                        ?
                        props.postings.map((posting) => (
                            <JobPostingCard
                                key={posting._id}
                                posting={posting}
                                setSelected={setSelected}
                            />
                        ))
                        :
                        <div>채용공고가 없습니다.</div>
                }
            </div>

            <div className="modal" id="job_modal" tabindex="-1" aria-labelledby="..." aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content rounded-4 shadow">
                        {
                            selected &&
                            <>
                                <div className="modal-body p-5">
                                    <div className="modal-header">
                                        <h2 className="fw-bold mb-0">{selected.title}</h2>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div>

                                        <h5 style={{ marginTop: 16 }}><b>회사명</b></h5>
                                        <p>{selected.name}</p>
                                        <hr />
                                        <h5><b>주요업무</b></h5>
                                        <p>{selected.field}</p>
                                        <hr />
                                        <h5><b>태그</b></h5>
                                        <p>{selected.tag}</p>
                                        <hr />
                                        <h5><b>상세소개글</b></h5>
                                        <p>{selected.description}</p>
                                        <hr />
                                        <h5><b>모집인원</b></h5>
                                        <p>{selected.recruit_number}</p>
                                        <hr />
                                        <h5><b>마감일</b></h5>
                                        <p>{selected.period}</p>
                                        <hr />
                                        <h5><b>홈페이지</b></h5>
                                        <p>{selected.site}</p>
                                        <button type="button" className="btn btn-outline-primary" onClick={() => bookMark(selected._id)}>
                                            <BiBookmark />북마크
                                        </button>
                                        <button className="btn btn-primary" type="submit" onClick={onClick}>지원하기</button>

                                    </div>
                                </div>
                            </>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}