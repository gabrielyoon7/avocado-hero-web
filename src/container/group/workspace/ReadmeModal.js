import { useEffect, useState } from "react"
import { Box, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import MKButton from "component/common/mui-components/MKButton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectedGroup } from "api/redux/group/groupSlice";

export default ({group, setOpen}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGroupCard = (group) => {
        // alert(JSON.stringify(group))
        if (window.confirm(`${group.project_name}으로 이동하시겠습니까?`)) {
            dispatch(selectedGroup(group));
            navigate(`/workspace/${group._id}`);
        }
    }

    return (
        <>
            <Box
                sx={{
                    p: {
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 4,
                        xl: 5,
                        xxl: 6
                    },
                }}
            >
                <DialogTitle id="scroll-dialog-title">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h4" variant="h3">
                            {group?.project_name}의 Read Me
                        </Typography>
                        <IconButton size="large" onClick={() => setOpen(false)}><ClearIcon fontSize="inherit" /></IconButton >
                    </Box>
                </DialogTitle>
                <DialogContent dividers={true}>
                    <Stack spacing={1}>
                        이 자리에는 그룹에서 설정한 Read Me를 띄워줄 예정임
                    </Stack>
                </DialogContent>
                <MKButton color="success" onClick={() => handleGroupCard(group)} fullWidth>워크스페이스로 이동하기</MKButton>
            </Box>
        </>
    )
}