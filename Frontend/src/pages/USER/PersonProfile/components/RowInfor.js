const RowInfor = ({ label, inFor }) => {
  return (
    <div className="mb-12">
      <span className="mr-6 fw-600 fs-16">{label}:</span>
      <span className="fs-16">{inFor}</span>
    </div>
  );
}

export default RowInfor