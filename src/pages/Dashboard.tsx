import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, List, BarChart3, Users, Settings } from 'lucide-react'
import { 
  Container, 
  Heading, 
  ThemeToggle, 
  Text, 
  Button, 
  Card, 
  CardHeader, 
  CardBody,
  Badge
} from '../components/ui'
import { usePriceLists } from '../hooks'

export const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  
  // Fetch price lists data for dashboard stats
  const { data: priceListsResponse } = usePriceLists()
  const totalPriceLists = priceListsResponse?.count || 0

  const handleViewPriceLists = () => {
    navigate('/price-lists')
  }

  const handleCreatePriceList = () => {
    navigate('/price-lists/new')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <Container>
          <div className="flex justify-between items-center py-6">
            <div>
              <Heading level={1}>Price List Manager</Heading>
              <Text variant="muted" size="sm">
                Manage your product pricing efficiently
              </Text>
            </div>
            <ThemeToggle />
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <Container className="space-y-8">
          {/* Quick Actions */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <Heading level={2} className="text-2xl font-semibold">
                  Quick Actions
                </Heading>
                <Text variant="muted">
                  Get started with managing your price lists
                </Text>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Create Price List */}
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleCreatePriceList}>
                <CardBody className="text-center py-8">
                  <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                    <Plus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <Heading level={3} className="text-lg font-semibold mb-2">
                    Create Price List
                  </Heading>
                  <Text variant="muted" size="sm">
                    Start building your product pricing structure
                  </Text>
                </CardBody>
              </Card>

              {/* View All Price Lists */}
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleViewPriceLists}>
                <CardBody className="text-center py-8">
                  <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                    <List className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <Heading level={3} className="text-lg font-semibold mb-2">
                    View Price Lists
                  </Heading>
                  <Text variant="muted" size="sm">
                    Browse and manage your existing price lists
                  </Text>
                  {totalPriceLists > 0 && (
                    <Badge variant="success" className="mt-2">
                      {totalPriceLists} list{totalPriceLists !== 1 ? 's' : ''}
                    </Badge>
                  )}
                </CardBody>
              </Card>

              {/* Analytics (Placeholder) */}
              <Card className="hover:shadow-lg transition-shadow cursor-pointer opacity-60">
                <CardBody className="text-center py-8">
                  <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <Heading level={3} className="text-lg font-semibold mb-2">
                    Analytics
                  </Heading>
                  <Text variant="muted" size="sm">
                    View pricing insights and performance metrics
                  </Text>
                  <Badge variant="secondary" className="mt-2">
                    Coming Soon
                  </Badge>
                </CardBody>
              </Card>
            </div>
          </section>

          {/* Dashboard Stats */}
          <section>
            <Heading level={2} className="text-2xl font-semibold mb-6">
              Overview
            </Heading>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Lists Count */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Text variant="muted" size="sm">
                      Total Price Lists
                    </Text>
                    <List className="h-4 w-4 text-gray-400" />
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {totalPriceLists}
                  </div>
                  <Text variant="muted" size="xs">
                    {totalPriceLists === 0 ? 'No lists created yet' : 'Active price lists'}
                  </Text>
                </CardBody>
              </Card>

              {/* Products Count (Placeholder) */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Text variant="muted" size="sm">
                      Total Products
                    </Text>
                    <BarChart3 className="h-4 w-4 text-gray-400" />
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    -
                  </div>
                  <Text variant="muted" size="xs">
                    Coming soon
                  </Text>
                </CardBody>
              </Card>

              {/* Users Count (Placeholder) */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Text variant="muted" size="sm">
                      Active Users
                    </Text>
                    <Users className="h-4 w-4 text-gray-400" />
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    -
                  </div>
                  <Text variant="muted" size="xs">
                    Coming soon
                  </Text>
                </CardBody>
              </Card>
            </div>
          </section>

          {/* Recent Activity (Placeholder) */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <Heading level={2} className="text-2xl font-semibold">
                Recent Activity
              </Heading>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleViewPriceLists}
              >
                View All
              </Button>
            </div>
            
            <Card>
              <CardBody className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <Settings className="h-8 w-8 text-gray-400" />
                </div>
                <Heading level={3} className="text-lg font-semibold mb-2">
                  Activity Feed Coming Soon
                </Heading>
                <Text variant="muted">
                  Track recent changes to your price lists and products here
                </Text>
              </CardBody>
            </Card>
          </section>
        </Container>
      </main>
    </div>
  )
}
