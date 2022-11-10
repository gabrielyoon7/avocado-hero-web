import { Alert, Box, Grid, Icon, Stack, TextField, Typography } from "@mui/material";
import ResponsiveCard from "component/common/ResponsiveCard";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MKButton from "component/common/mui-components/MKButton";
import ModalStaticBackdrop from "component/common/modal/ModalStaticBackdrop";
import { useState } from "react";
import OrganizationCreateModal from "./OrganizationCreateModal";
export default function OrganizationContainer() {

    const steps = [
        {
            number: "01",
            label: '조직을 생성하세요',
            description: `조직을 생성하시면 비밀스러운 전용 코드를 부여해드립니다. 이 코드를 조직원들에게만 공유하세요`,
        },
        {
            number: "02",
            label: '조직 내 그룹을 형성하세요',
            description:
                '조직 코드를 가지고 조직원들끼리 알아서 팀을 형성하도록 해주세요. 정원이나 최대 팀 수를 미리 공지하는 것도 한 가지 방법입니다.',
        },
        {
            number: "03",
            label: '조직에 속한 그룹을 관리하세요',
            description: `조직 코드와 함께 생성된 그룹들은 이 계정에서 관리할 수 있습니다.`,
        },
        {
            number: "04",
            label: '그룹은 영원해요',
            description: `조직을 해체하셔도 그룹은 삭제되지 않습니다.`,
        },
    ];

    const organizations = [
        {
            title: "2022-1 운영체제 수업",
            code: "XD4D2",
            notice: "공지공지",
            maxTeam: 10,
            maxMember: 5,
        },
        {
            title: "2022-2 웹보안",
            code: "F3G5H",
            notice: "공지공지",
            maxTeam: 10,
            maxMember: 5,
        },
        {
            title: "경기대학교 바른문제해결프로젝트",
            code: "T1H0N",
            notice: "공지공지",
            maxTeam: 10,
            maxMember: 5,
        },
        {
            title: "상상기업",
            code: "GABR1",
            notice: "공지공지",
            maxTeam: 10,
            maxMember: 5,
        }
    ]

    const [organizationModalOpen, setOrganizationModalOpen] = useState(false);

    return (
        <Stack spacing={3}>
            <Box>
                {steps.map((step) =>
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} md={4} my={5}>
                            <Stack
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Typography variant="caption">STEP</Typography>
                                <Typography variant="h1">{step.number}</Typography>

                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={8} my={5}>
                            <Typography variant="h4">{step.label}</Typography>
                            <Typography>{step.description}</Typography>
                        </Grid>
                    </Grid>
                )}
            </Box>

            <MKButton
                color="success"
                onClick={()=>setOrganizationModalOpen(true)}
            >
                조직 생성하기
            </MKButton>

            <Box>
                <Typography variant="h5">내가 소유한 조직</Typography>
                <Grid
                    container
                    spacing={2}
                >
                    {
                        organizations.map((org) =>
                            <Grid item xs={12} md={6}>
                                <ResponsiveCard>
                                    <Stack direction={"row"} justifyContent="space-between">
                                        <Typography variant="h5">{org.title}</Typography>
                                        <Typography variant="h3">{org.code}<ContentCopyIcon fontSize="small" /></Typography>
                                    </Stack>
                                </ResponsiveCard>
                            </Grid>
                        )
                    }
                </Grid>
            </Box>
            <Box>
                <Alert>위 카드를 누르면 떠야하는 기능. 공지사항과 최대 팀 수, 최대 팀원 수는 워크스페이스와 조직 검색 등 전반에 걸쳐 등장할 예정</Alert>
                <Typography variant="h5">조직 설정</Typography>
                <TextField label="공지사항" fullWidth/>
                <TextField label="최대 팀 수" fullWidth/>
                <TextField label="최대 팀원 수" fullWidth/>
                <Typography>이 자리에는 이 조직에 속한 그룹들이 리스트로 한눈에 보여야 한다. 리스트에는 그룹명, 팀원 이름 등이 떠야 함.</Typography>
            </Box>

            <ModalStaticBackdrop
                keepMounted
                width="md"
                open={organizationModalOpen}
                component={
                    <OrganizationCreateModal
                        setOpen={setOrganizationModalOpen}
                    />
                }
            />

        </Stack>
    )
}