type StatCardProps = {
  label: string
  value: string
  accent: 'purple' | 'green' | 'blue' | 'red' | 'amber'
}

function StatCard({ label, value, accent }: StatCardProps) {
  return (
    <div className={`stat-card ${accent}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

export default StatCard
