import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const AlertStats = ({ alerts }) => {
  // Process data for charts
  const severityData = [
    { name: 'Critical', count: alerts?.filter(a => a?.severity === 'Critical')?.length, color: '#DC2626' },
    { name: 'High', count: alerts?.filter(a => a?.severity === 'High')?.length, color: '#EF4444' },
    { name: 'Medium', count: alerts?.filter(a => a?.severity === 'Medium')?.length, color: '#F59E0B' },
    { name: 'Low', count: alerts?.filter(a => a?.severity === 'Low')?.length, color: '#10B981' }
  ];

  const disasterTypeData = [
    { name: 'Fire', count: alerts?.filter(a => a?.type === 'Fire')?.length },
    { name: 'Flood', count: alerts?.filter(a => a?.type === 'Flood')?.length },
    { name: 'Earthquake', count: alerts?.filter(a => a?.type === 'Earthquake')?.length },
    { name: 'Cyclone', count: alerts?.filter(a => a?.type === 'Cyclone')?.length },
    { name: 'Landslide', count: alerts?.filter(a => a?.type === 'Landslide')?.length }
  ]?.filter(item => item?.count > 0);

  const totalAffected = alerts?.reduce((sum, alert) => sum + alert?.affectedPopulation, 0);
  const avgResponseTime = alerts?.length > 0 ? 
    alerts?.reduce((sum, alert) => sum + (alert?.responseTime || 15), 0) / alerts?.length : 0;

  const COLORS = ['#DC2626', '#EF4444', '#F59E0B', '#10B981', '#3B82F6'];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Alerts</p>
              <p className="text-2xl font-bold text-foreground">{alerts?.length}</p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <Icon name="AlertTriangle" size={24} color="#DC2626" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">People Affected</p>
              <p className="text-2xl font-bold text-foreground">{totalAffected?.toLocaleString('en-IN')}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Icon name="Users" size={24} color="#2563EB" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Response Time</p>
              <p className="text-2xl font-bold text-foreground">{avgResponseTime?.toFixed(0)} min</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <Icon name="Clock" size={24} color="#059669" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Critical Alerts</p>
              <p className="text-2xl font-bold text-red-600">
                {alerts?.filter(a => a?.severity === 'Critical')?.length}
              </p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <Icon name="AlertCircle" size={24} color="#DC2626" />
            </div>
          </div>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Severity Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center space-x-2">
            <Icon name="BarChart3" size={20} />
            <span>Alerts by Severity</span>
          </h3>
          <div className="h-64" aria-label="Alerts by Severity Bar Chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Disaster Type Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center space-x-2">
            <Icon name="PieChart" size={20} />
            <span>Alerts by Type</span>
          </h3>
          <div className="h-64" aria-label="Alerts by Type Pie Chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={disasterTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {disasterTypeData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Recent Activity Timeline */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Activity" size={20} />
          <span>Recent Alert Activity</span>
        </h3>
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {alerts?.slice(0, 5)?.map((alert, index) => (
            <div key={alert?.id} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                alert?.severity === 'Critical' ? 'bg-red-600' :
                alert?.severity === 'High' ? 'bg-red-500' :
                alert?.severity === 'Medium' ? 'bg-amber-500' : 'bg-green-500'
              }`}></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {alert?.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {alert?.location} • {new Date(alert.timestamp)?.toLocaleTimeString('en-IN', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded ${
                alert?.severity === 'Critical' ? 'bg-red-600 text-white' :
                alert?.severity === 'High' ? 'bg-red-500 text-white' :
                alert?.severity === 'Medium' ? 'bg-amber-500 text-white' : 'bg-green-500 text-white'
              }`}>
                {alert?.severity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertStats;