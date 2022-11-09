import { Grid, Stack, Tooltip } from "@mui/material";
import { selectUser } from "api/redux/user/userSlice";
import axios from "axios";
import ModalStaticBackdrop from "component/common/modal/ModalStaticBackdrop";
import MKButton from "component/common/mui-components/MKButton";
import GroupCardV2 from "component/group/card/GroupCardV2";
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GroupCeateModal from "./modal/GroupCeateModal";
import GroupJoinModalV2 from "./modal/GroupJoinModalV2";
import SearchIcon from '@mui/icons-material/Search';
import GroupFilterModal from "./modal/GroupFilterModal";
import React from 'react';

const GroupFinderContainer = () => {

    const navigate = useNavigate();

    const user = useSelector(selectUser);

    const [groupCreateModalOpen, setGroupCreateModalOpen] = useState(false);
    const [groupJoinModalOpen, setGroupJoinModalOpen] = useState(false);
    const [groupFilterModalOpen, setGroupFilterModalOpen] = useState(false);

    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const DATA_REQUEST_SIZE = 3;

    //무한스크롤을 위한 코드
    const [target, setTarget] = useState(null);
    const groupDataSize = useRef(0);


    const fetchData = async (groupDataSize) => {
        console.log(`yeah ${groupDataSize} ${DATA_REQUEST_SIZE}`)
        if (groupDataSize % DATA_REQUEST_SIZE === 0) {
            // const response = await axios.get("/groupsRouter/getGroups");
            const response = await axios.post("/groupsRouter/getGroupsInfinity", {
                skip: groupDataSize,
                limit:DATA_REQUEST_SIZE
            });
            const data = await response.data;
            setGroups((prev) => prev.concat(data));
            return data.length;
        }
        return 0;
    }


    useEffect(() => {
        console.log(`yeah is loaded`)
    }, [])

    useEffect(() => {
        let observer;
        let receivedDataSize = 0;
        if (target) {
            const onIntersect = async ([entry], observer) => {
                if (entry.isIntersecting) {
                    observer.unobserve(entry.target);
                    receivedDataSize = await fetchData(groupDataSize.current);
                    groupDataSize.current += receivedDataSize;
                    observer.observe(entry.target);
                }
            };
            observer = new IntersectionObserver(onIntersect, { threshold: 1 });
            observer.observe(target);

        }
        return () => {
            observer && observer.disconnect();
        }
    }, [target]);


    // useEffect(() => {
    //     axios.get("/groupsRouter/getGroups").then((response) => {
    //         // console.log(JSON.stringify(response.data))
    //         setGroups(response.data);
    //     }).catch(function (error) {
    //         console.log(error);
    //     });
    // }, [])

    const handleGroupCard = (group) => {
        setSelectedGroup(group)
        setGroupJoinModalOpen(true)
    }

    return (
        <>

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={5}
            >
                <MKButton
                    color="success"
                    variant="contained"
                    onClick={() => setGroupFilterModalOpen(true)}
                >
                    <SearchIcon />
                </MKButton>
                <Stack
                    direction="row"
                    spacing={1}
                >
                    <Tooltip title={user ? "나의 워크스페이스 목록을 조회합니다." : "로그인이 필요한 메뉴입니다."}>
                        <MKButton
                            variant="outlined"
                            color={user ? "success" : "secondary"}
                            onClick={() => user && navigate('/myWorkspace/')}
                        >
                            내 워크스페이스 보기
                        </MKButton>
                    </Tooltip>
                    <Tooltip title={user ? "새 프로젝트를 등록하여 팀원을 모집합니다." : "로그인이 필요한 메뉴입니다."}>
                        <MKButton
                            variant="contained"
                            color={user ? "info" : "secondary"}
                            onClick={() => user && setGroupCreateModalOpen(true)}
                        >
                            프로젝트 등록하기
                        </MKButton>
                    </Tooltip>
                </Stack>
            </Stack>

            <Grid
                container
                spacing={1}
                alignItems="stretch"
            >
                {
                    groups.length > 0
                        ?
                        groups.map((group) => (
                            <Grid item xs={12} md={6} xxl={4} key={group._id}>
                                <GroupCardV2
                                    key={group._id}
                                    group={group}
                                    handleGroupCard={handleGroupCard}
                                />
                            </Grid>
                        ))
                        :
                        <div>그룹이 없습니다.</div>
                }
                <div ref={setTarget}>This is Target. (이게 스크린에 보이면 타겟을 동작 시키게 됨)</div>
            </Grid>
            <ModalStaticBackdrop
                keepMounted
                width="md"
                open={groupJoinModalOpen}
                component={<GroupJoinModalV2 selectedGroup={selectedGroup} setOpen={setGroupJoinModalOpen} />}
            />
            <ModalStaticBackdrop
                keepMounted
                width="md"
                open={groupCreateModalOpen}
                component={<GroupCeateModal groupCreateModalOpen={groupCreateModalOpen} setOpen={setGroupCreateModalOpen} />}
            />
            <ModalStaticBackdrop
                keepMounted
                width="sm"
                open={groupFilterModalOpen}
                component={<GroupFilterModal setOpen={setGroupFilterModalOpen} />}
            />
        </>
    )
}

export default GroupFinderContainer;