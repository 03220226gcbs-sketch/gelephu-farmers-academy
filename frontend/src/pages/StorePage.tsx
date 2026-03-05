import { useState } from 'react';
import { useGetAllCourseware, usePurchaseCourseware } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShoppingBag, Package, BookOpen, LogIn, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';
import type { CoursewareProduct } from '../backend';

const defaultProducts: CoursewareProduct[] = [
  {
    id: BigInt(1),
    title: 'Hydroponic Farming Complete Guide',
    description:
      'A comprehensive 200-page guide covering all aspects of hydroponic farming from setup to harvest. Includes nutrient charts, system diagrams, and troubleshooting tips.',
    price: 450,
    inventory: BigInt(50),
  },
  {
    id: BigInt(2),
    title: 'Drip Irrigation Design Manual',
    description:
      'Step-by-step manual for designing and installing drip irrigation systems for small to medium farms. Includes calculation worksheets and supplier contacts.',
    price: 350,
    inventory: BigInt(30),
  },
  {
    id: BigInt(3),
    title: 'Organic Farming Certification Workbook',
    description:
      'Workbook for farmers pursuing organic certification. Covers documentation requirements, soil management, and pest control without chemicals.',
    price: 280,
    inventory: BigInt(40),
  },
  {
    id: BigInt(4),
    title: 'Bamboo Cultivation & Processing Handbook',
    description:
      'Complete handbook on bamboo species selection, cultivation techniques, harvesting, and processing for commercial use.',
    price: 520,
    inventory: BigInt(25),
  },
  {
    id: BigInt(5),
    title: 'Precision Farming Technology Kit',
    description:
      'Educational kit with guides on using GPS, sensors, and mobile apps for precision agriculture. Includes case studies from Bhutanese farms.',
    price: 680,
    inventory: BigInt(20),
  },
  {
    id: BigInt(6),
    title: 'Farmer Business Planning Toolkit',
    description:
      'Practical toolkit for farm business planning including financial templates, market analysis guides, and grant application support.',
    price: 320,
    inventory: BigInt(60),
  },
];

export default function StorePage() {
  const { identity } = useInternetIdentity();
  const { data: products, isLoading } = useGetAllCourseware();
  const purchaseMutation = usePurchaseCourseware();

  const [selectedProduct, setSelectedProduct] = useState<CoursewareProduct | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const displayProducts = products && products.length > 0 ? products : defaultProducts;

  const handlePurchaseClick = (product: CoursewareProduct) => {
    if (!identity) {
      setShowLoginPrompt(true);
      return;
    }
    setSelectedProduct(product);
    setQuantity(1);
  };

  const handleConfirmPurchase = async () => {
    if (!selectedProduct) return;
    try {
      await purchaseMutation.mutateAsync({
        productId: selectedProduct.id,
        quantity: BigInt(quantity),
      });
      toast.success(`Successfully purchased ${quantity}x "${selectedProduct.title}"!`);
      setSelectedProduct(null);
    } catch (error: any) {
      toast.error(error.message || 'Purchase failed. Please try again.');
    }
  };

  return (
    <div className="space-y-0">
      {/* Hero Banner */}
      <section className="relative overflow-hidden">
        <img
          src="/assets/generated/courseware-store-banner.dim_1200x400.png"
          alt="Courseware Store"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 flex items-center">
          <div className="container">
            <Badge variant="secondary" className="mb-3">
              Pedagogy Store
            </Badge>
            <h1 className="text-4xl font-bold text-white mb-3">Courseware & Training Materials</h1>
            <p className="text-white/80 text-lg max-w-2xl">
              Purchase high-quality training materials, guides, and course packages developed by our
              expert instructors.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12 space-y-10">
        {/* Info Banner */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <BookOpen className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium">All prices are in Bhutanese Ngultrum (Nu.)</p>
            <p className="text-sm text-muted-foreground">
              Login required to complete a purchase. Materials are available for immediate download
              after purchase.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map(product => {
              const inStock = Number(product.inventory) > 0;
              return (
                <Card key={Number(product.id)} className="flex flex-col hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant={inStock ? 'secondary' : 'destructive'} className="text-xs">
                        {inStock ? `${Number(product.inventory)} in stock` : 'Out of stock'}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">{product.title}</CardTitle>
                    <CardDescription className="leading-relaxed">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1" />
                  <CardFooter className="flex items-center justify-between pt-0">
                    <span className="text-2xl font-bold text-primary">
                      Nu. {product.price.toLocaleString()}
                    </span>
                    <Button
                      onClick={() => handlePurchaseClick(product)}
                      disabled={!inStock}
                      size="sm"
                      className="gap-2"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      {inStock ? 'Purchase' : 'Unavailable'}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Purchase Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogDescription>
              You are about to purchase: <strong>{selectedProduct?.title}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  min={1}
                  max={Number(selectedProduct?.inventory || 1)}
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setQuantity(q => Math.min(Number(selectedProduct?.inventory || 1), q + 1))
                  }
                  disabled={quantity >= Number(selectedProduct?.inventory || 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
              <span className="text-sm text-muted-foreground">Total Amount</span>
              <span className="text-xl font-bold text-primary">
                Nu. {((selectedProduct?.price || 0) * quantity).toLocaleString()}
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedProduct(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmPurchase}
              disabled={purchaseMutation.isPending}
              className="gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              {purchaseMutation.isPending ? 'Processing...' : 'Confirm Purchase'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Login Prompt Dialog */}
      <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You need to be logged in to purchase courseware materials. Please login to continue.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLoginPrompt(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowLoginPrompt(false)} className="gap-2">
              <LogIn className="h-4 w-4" />
              Login to Purchase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
