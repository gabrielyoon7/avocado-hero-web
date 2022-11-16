import axios from "axios";
import { useEffect, useState } from "react";
import RoleCard from "component/group/card/RoleCard";
import { ResponsiveBar } from '@nivo/bar';
import { role } from "../../../../assets/tag/Role";
import ProfilePieChart from "./ProfilePieChart";
import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProfileRadar from "./ProfileRadar";

const ProfilePortpolio = () => {
    const navigate = useNavigate();

    const [groups, setGroups] = useState([]);
    const [roleStatistics, setRoleStatistics] = useState([])
    const [showRoleStatistics, setShowRoleStatistics] = useState(false)

    const setSelectedGroup = (group) => {
        // alert(JSON.stringify(group))
        if (window.confirm(group.project_name + '으로 이동하시겠습니까?')) {
            window.location.href = "/project/" + group._id;
        }
    };
    const sessionStorage = window.sessionStorage;

    useEffect(() => {
        if (sessionStorage.getItem("user")) {
            const userInfo = JSON.parse(sessionStorage.getItem("user"));
            // axios.post("/groupsRouter/getAppliedGroup", {
            //     user_id: userInfo.user_id,
            // }).then((response) => {
            //     setAppliedGroups(response.data);
            // }).catch(function (error) {
            //     console.log(error);
            // });
            axios.post("/groupsRouter/getMyGroup", {
                user_id: userInfo.user_id,
            }).then((response) => {
                setGroups(response.data);
                formatRoleData(response.data, userInfo.user_id);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, []);

    const formatRoleData = (groups, user_id) => {
        const role_statistics = role.map((r) => { return { "id": r.value, "label": r.label, "value": 0 } })
        groups.map((group) => {
            const user_role = group.members.find((m) => m.user_id === user_id).user_role;
            user_role?.map((r) => role_statistics.find(rs => rs.id === r).value += 1)
        })

        const result = role_statistics.filter((r) => r.value > 0)
        if (result.length > 0) {
            setShowRoleStatistics(true);
            setRoleStatistics(result);
        }
    }

    const goProjectList = () => {
        navigate(`/groupFinder`);
    }

    return (
        <>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">역할</h1>
            </div>

            {/* 그래프 */}
            <div style={{ width: '100%', height: '300px', margin: '0 auto' }}>
                <ResponsiveBar
                    data={[
                        {
                            "country": "ㅁㄴㅇ",
                            "hot dog": 56,
                            "hot dogColor": "hsl(246, 70%, 50%)",
                            "burger": 110,
                            "burgerColor": "hsl(300, 70%, 50%)",
                            "sandwich": 26,
                            "sandwichColor": "hsl(283, 70%, 50%)",
                            "kebab": 48,
                            "kebabColor": "hsl(310, 70%, 50%)",
                            "fries": 110,
                            "friesColor": "hsl(355, 70%, 50%)",
                            "donut": 51,
                            "donutColor": "hsl(8, 70%, 50%)"
                        },
                    ]}
                    keys={[
                        'hot dog',
                        'burger',
                        'sandwich',
                        'kebab',
                        'fries',
                        'donut'
                    ]}
                    indexBy="country"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.4}
                    layout="horizontal"
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={{ scheme: 'nivo' }}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                1.6
                            ]
                        ]
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 10,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '참여 프로젝트',
                        legendPosition: 'middle',
                        legendOffset: 40
                    }}
                    axisLeft={null}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                1.6
                            ]
                        ]
                    }}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                    role="application"
                    ariaLabel="Nivo bar chart demo"
                    barAriaLabel={function (e) { return e.id + ": " + e.formattedValue + " in country: " + e.indexValue; }}

                />
            </div>

            {showRoleStatistics ?
                <ProfilePieChart data={roleStatistics} />
                : <Alert action={
                    <Button color="error" size="large" onClick={() => goProjectList()}>
                        프로젝트 리스트 보기
                    </Button>} severity="info">역할 통계 데이터가 존재하지 않습니다. 프로젝트에 참여하여 새로운 역할을 받아보세요!</Alert>
            }

            <ProfileRadar />

            {/* <div className="my-3">
                    <br />
                    
                    <h4>현재 소속 그룹의 역할</h4>
                    <div className="my-3 row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3 align-items-stretch ">
                                {
                        groups.length > 0
                            ?
                            <>
                                {
                                    groups.map((group) => {
                                        if (group.end_project === false) {
                                            return <RoleCard
                                                key={group._id}
                                                group={group}
                                                setSelectedGroup={setSelectedGroup}
                                            />
                                        }
                                    })
                                }
                            </>
                            :
                            <div>프로젝트가 없습니다.</div>
                    }
                    </div>
                    </div>

                    <div className="my-3">
                    <br />
                <h4>과거 소속 그룹의 역할
                    </h4> 
                <div className="my-3 row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3 align-items-stretch ">
                    {
                        groups.length > 0
                            ?
                            <>
                                {
                                    groups.map((group) => {
                                        if (group.end_project === true) {
                                            return <RoleCard
                                                key={group._id}
                                                group={group}
                                                setSelectedGroup={setSelectedGroup}
                                        />;
                                        }
                                    })
                                }
                            </>
                            :
                            <div>프로젝트가 없습니다.</div>
                    }
                </div>
            </div> */}

        </>
    );
};

export default ProfilePortpolio;