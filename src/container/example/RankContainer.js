import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import LodingSpinner from "../../component/common/LodingSpinner";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [isListOpen, setListOpen] = useState(true);

  useEffect(() => {
    axios
      .get("/testsRouter/findLogs")
      .then((response) => {
        let temp = [];
        if (response.data != null) {
          temp = response.data;
          temp.map((log) => {
            log["time"] = koreanTime(log.time);
          }); //서버쪽에서 실수로 영국시간 받고 있었어서 부득이하게 이렇게 조치함
        }
        setData(temp);
        setUser([]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let temp = [];
    let user_set = new Set();
    data.map((log) => {
      // console.log(temp)
      user_set.add(log.user_id);
    });
    user_set.forEach((id) => {
      temp.push({
        user_id: id,
        visited_date: new Set(),
      });
    });
    data.map((log) => {
      const index = temp.findIndex((item) => item.user_id == log.user_id);
      temp[index].visited_date = temp[index].visited_date.add(yymmdd(log.time));
    });
    setUser(temp);
  }, [data]);

  const yymmdd = (t) => {
    const date = t.split(". ");
    return date[0] + "-" + date[1] + "-" + date[2];
  };

  const koreanTime = (t) => {
    const dateNum = Date.parse(t);
    const date = new Date(dateNum).toLocaleString();
    return date;
  };

  const options = {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0, //y축 최소값 설정
            stepSize: 1, //y축 한 칸당 수치
          },
        },
      ],
    },
    maintainAspectRatio: true,
  };

  const datachart = {
    // {user.map(user) => ({
    //     if (user.user_id === "gabrielyoon7"){
    //         const 윤주현 = user.visited_date.size * 2
    //     }
    // })}

    //각 막대별 라벨
    labels: [
      "윤주현",
      "박소영",
      "함현준",
      "남진수",
      "김연수",
      "김세은",
      "김도희",
    ],
    datasets: [
      {
        borderWidth: 1, // 테두리 두께
        data: [1, 2, 3, 4, 5, 6, 7], // 수치
        backgroundColor: [
          "rgba(62, 121, 37)",
          "rgba(132, 150, 53)",
          "rgba(180, 203, 51)",
          "rgba(246, 199, 75)",
          "rgba(242, 231, 151)",
          "rgba(199, 130, 61)",
          "rgba(227, 125, 78)",
        ],
      },
    ],
  };

  return (
    <>
      <div>
        <h1>포인트 계산기</h1>
        <div className="my-3">
          <div className="d-flex justify-content-between">
            <h3>유저별 포인트</h3>
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
                onClick={() => setListOpen(!isListOpen)}
              >
                {isListOpen ? "닫기▵" : "펼치기▿"}
              </button>
            </h2>
          </div>
          <div>
            {user.length > 0 ? (
              user.map((user) => (
                <div key={user.user_id} className=" my-2">
                  <div className="d-flex justify-content-between">
                    <h4>
                      [
                      <Link className="" to={"/user/" + user.user_id}>
                        {user.user_id}
                      </Link>
                      ]
                    </h4>
                    <h4>총 {user.visited_date.size * 2}점</h4>
                  </div>
                  <div className="accordion-item">
                    <div className="accordion-item">
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <div>
                            {Array.from(user.visited_date).map((d) => (
                              <div>{d} (+2점)</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))
            ) : (
              <LodingSpinner />
            )}
          </div>
        </div>
        <div>
          <h3>그래프</h3>
          <Bar data={datachart} width={300} height={200} options={options} />
        </div>
        <h3>출석부</h3>
        <div>ㅇㅇ</div>
        <h3>전체 로그</h3>
        <div>
          {data.length > 0 ? (
            data.map((log) => (
              <div key={log.secure_num}>
                {log.secure_num} {log.time}{" "}
                <Link to={"/user/" + log.user_id}>{log.user_id}</Link>{" "}
              </div>
            ))
          ) : (
            <LodingSpinner />
          )}
        </div>
      </div>
    </>
  );
};
