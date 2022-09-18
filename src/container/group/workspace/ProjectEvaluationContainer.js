import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectEvaluationContainer = () => {
    const params = useParams();
    const {id, user_id} = params;
    const commentInput = useRef();
    const [userInfo, setUserInfo] = useState({user_id: ''});
    const evaluation_index = [
        {
            label: '질적 공헌도',
            value: 'qualitative_contribution',
            questions: [
                {
                    id: 'QL1',
                    question: '해당 팀원이 제안한 의견이 실용적이었나요?',
                    score: 0
                },
                {
                    id: 'QL2',
                    question: '해당 팀원이 맡인 역할의 완성도가 높았나요?',
                    score: 0
                }
            ],
            avg_score: 0
        },
        {
            label: '양적 공헌도',
            value: 'quantitative_contribution',
            questions: [
                {
                    id: 'QT1',
                    question: '해당 팀원이 프로젝트 수행에 있어 높은 참여도를 보였나요?',
                    score: 0
                },
                {
                    id: 'QT2',
                    question: '해당 팀원이 높은 회의 출석률을 보였나요?',
                    score: 0
                }
            ],
            avg_score: 0
        },
        {
            label: '참여 태도',
            value: 'participation_attitude',
            questions: [
                {
                    id: 'P1',
                    question: '팀에 헌신적인 모습을 보였나요?',
                    score: 0
                },
                {
                    id: 'P2',
                    question: '해당 팀원과의 의사소통이 잘 됐나요?',
                    score: 0
                },
                {
                    id: 'P3',
                    question: '다른 팀원의 의견을 존중하는 태도를 보였나요?',
                    score: 0
                }
            ],
            avg_score: 0
        },
        {
            label: '책임감',
            value: 'responsibility',
            questions: [
                {
                    id: 'R1',
                    question: '자신이 맡은 업무를 주어진 기간 내에 수행하였나요?',
                    score: 0
                },
                {
                    id: 'R2',
                    question: '회의 시간을 엄수하였나요?',
                    score: 0
                }
            ],
            avg_score: 0
        },
        {
            label: '적합성',
            value: 'compatibility',
            questions: [
                {
                    id: 'C1',
                    question: '이 팀원과 다시 팀으로 만나 프로젝트를 진행하고싶나요?',
                    score: 0
                }
            ],
            avg_score: 0
        }
    ]
    const score = [
        {
            label: '매우 동의',
            value: '5',
        },
        {
            label: '동의',
            value: '4',
        },
        {
            label: '보통',
            value: '3',
        },
        {
            label: '비동의',
            value: '2',
        },
        {
            label: '매우 비동의',
            value: '1',
        },
    ]

    useEffect(() => {
        if (sessionStorage.getItem("user")) {
            setUserInfo(JSON.parse(sessionStorage.getItem("user")));
        }
    }, []);

    const selectScore = (idx, question, score) => {
        question.score = parseInt(score);
        const total_score = evaluation_index[idx].questions.reduce(function add(sum, currValue) {
            return sum + currValue.score;
          }, 0);
        evaluation_index[idx].avg_score = total_score / evaluation_index[idx].questions.length;
        // console.log(evaluation_index[idx]);
    }

    const saveEvaluation = () => {
        evaluation_index.map((element) => {
            delete element.label;
            delete element.value;
            element.questions.map((q) => {
                delete q.question;
            })
        })
        const newData = {
            project_id: id,
            from: userInfo.user_id,
            to: user_id,
            score_eval: evaluation_index,
            comment_eval: commentInput.current.value
        }

        axios.post("/evaluationsRouter/saveEvaluation", newData).then((response) => {
            if(response.data.success) {
                window.history.back();
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className="mt-3">
            {evaluation_index.map((evaluation, idx) => 
                <div className="mb-5" key={evaluation.value}>
                    <h1>{evaluation.label}</h1>
                    <hr />
                    {evaluation.questions.map((question) =>
                        <div className="mb-3" key={question.id}>
                            <h3>{question.question}</h3>
                            {score.map((s, index) =>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name={question.id} id={"inlineRadio"+index} value={s.value} onClick={() => selectScore(idx, question, s.value)} />
                                    <label className="form-check-label" for={"inlineRadio" + index}>{s.label}</label>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="mb-5">
                <h1>기타</h1>
                <hr />
                <div className="mb-3">
                    <h3>팀원에 대한 평가를 써주세요.</h3>
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here" ref={commentInput} id="floatingTextarea2" style={{height: "100px"}}></textarea>
                        <label for="floatingTextarea2">Comments</label>
                    </div>
                </div>
            </div>

            <div class="d-grid gap-2 col-4 mx-auto mb-4">
                <button class="btn btn-primary" type="button" onClick={() => saveEvaluation()}>저장</button>
            </div>
        </div> 
    )
}

export default ProjectEvaluationContainer;