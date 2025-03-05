'use client'
import { ModeToggle } from "@/components/ui/toggle-themes";
import { Layout} from "antd";
import React from "react";

const DashBoardPage = () => {
    const { Content } = Layout;

    return (
        <>
            Dashboard Page
            <ModeToggle />
        </>
    );
};

export default DashBoardPage;