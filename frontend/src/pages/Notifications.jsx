const Notifications = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-6 text-white">
      <h2 className="text-xl font-bold mb-2">🔔 Notifications</h2>
      <p className="text-sm text-gray-400 mb-6">
        Latest updates
      </p>

      <div className="space-y-3">

        <NotificationItem
          title="Wallet Credited"
          message="₹1,000 added to your wallet"
        />

        <NotificationItem
          title="Withdrawal Approved"
          message="₹500 withdrawal approved"
        />

        <NotificationItem
          title="New Offer Available"
          message="20% bonus on add money"
        />

      </div>
    </div>
  );
};

const NotificationItem = ({ title, message }) => (
  <div className="bg-[#0f172a] border border-white/10 rounded-xl p-4">
    <p className="font-semibold text-sm">{title}</p>
    <p className="text-xs text-gray-400 mt-1">
      {message}
    </p>
  </div>
);

export default Notifications;
