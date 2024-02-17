import { Button, Container } from "@mui/material";

interface LoadButtonProps {
  handleLoad: React.MouseEventHandler<HTMLButtonElement>;
  hasMoreData: boolean
}

function LoadButton({ handleLoad, hasMoreData }: LoadButtonProps) {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <Button
        onClick={handleLoad}
        disabled={!hasMoreData}
      >
        {hasMoreData ? "Load more" : "No more results"}
      </Button>
    </Container>
  );
}

export default LoadButton;
