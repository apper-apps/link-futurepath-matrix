import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const MembershipBadge = ({ tier, className }) => {
  if (tier === "premium") {
    return (
      <Badge variant="premium" className={className}>
        <ApperIcon name="Crown" size={12} className="mr-1" />
        Premium
      </Badge>
    );
  }

  return (
    <Badge variant="free" className={className}>
      <ApperIcon name="Users" size={12} className="mr-1" />
      Free
    </Badge>
  );
};

export default MembershipBadge;