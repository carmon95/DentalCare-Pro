import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Boot() {

    const navigate = useNavigate();

    useEffect(() => {

        const start = async () => {

            const route =
                await window.electronAPI.getInitialRoute();

            navigate(route, { replace: true });

        };

        start();

    }, [navigate]);

    return null;

}