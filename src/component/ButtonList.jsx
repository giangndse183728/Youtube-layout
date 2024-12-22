import React from 'react';
import { Button, Stack } from '@mui/material';

const buttonData = [
    "Tất cả",
    "Âm nhạc",
    "Trò chơi",
    "Nhạc Hip-hop",
    "Danh sách kết hợp",
    "Tin tức",
    "Trực tiếp",
    "Đọc rap",
    "Mới tải lên gần đây",
    "Đã xem",
    "Đề xuất mới"
];

const ButtonList = () => {
    return (
        <Stack direction="row" spacing={1}  sx={{mb:2,}}>
            {buttonData.map((text, index) => (
                <Button
                    key={index}
                    color="neutral"
                    sx={{
                        px: 2,
                        backgroundColor: "#f0f0f0",
                        mr: 1,
                        textTransform: 'none', // Prevent uppercase text
                        color: 'black',
                        borderRadius: 3
                    }}
                >
                    {text}
                </Button>
            ))}
        </Stack>
    );
};

export default ButtonList;
