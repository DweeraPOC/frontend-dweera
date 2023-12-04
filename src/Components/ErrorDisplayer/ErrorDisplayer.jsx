import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function ErrorDisplayer({ error }) {
  return (
    <div>
      {error && (
        <p className="text-red-600 w-fit pt-1 text-sm flex gap-1">
          <ErrorOutlineIcon sx={{ fontSize: 20 }} /> <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export default ErrorDisplayer;
