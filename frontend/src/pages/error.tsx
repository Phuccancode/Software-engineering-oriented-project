import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import { Result, Button } from "antd";
export default function ErrorPage() {
    const error = useRouteError() as { statusText?: string; message: string };
    return (
        <Result
            status="404"
            title="404"
            subTitle={error.statusText || error.message}
            extra={
                <Button type="primary">
                    <Link to="/">Back HomePage</Link>
                </Button>}
        />
    );
}