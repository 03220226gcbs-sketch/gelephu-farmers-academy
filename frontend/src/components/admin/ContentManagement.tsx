import { useState, useEffect } from 'react';
import { useGetPublicContent, useUpdatePublicContent } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { FileText, Plus, Trash2, Lock } from 'lucide-react';
import { toast } from 'sonner';
import type { TeamMember, NewsItem } from '../../backend';

export default function ContentManagement() {
  const { data: publicContent } = useGetPublicContent();
  const updateContent = useUpdatePublicContent();
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  const [goals, setGoals] = useState('');
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    if (publicContent) {
      setMission(publicContent.mission);
      setVision(publicContent.vision);
      setGoals(publicContent.goals);
      setTeam(publicContent.team);
      setNews(publicContent.news);
    }
  }, [publicContent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateContent.mutateAsync({
        mission: publicContent?.mission || mission,
        vision,
        goals,
        team,
        news,
      });
      toast.success('Public content updated successfully');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to update content';
      toast.error(msg);
    }
  };

  const addTeamMember = () => {
    setTeam([...team, { name: '', role: '', expertise: '' }]);
  };

  const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
    const updated = [...team];
    updated[index] = { ...updated[index], [field]: value };
    setTeam(updated);
  };

  const removeTeamMember = (index: number) => {
    setTeam(team.filter((_, i) => i !== index));
  };

  const addNewsItem = () => {
    setNews([...news, { title: '', content: '', date: BigInt(Date.now() * 1000000) }]);
  };

  const updateNewsItem = (index: number, field: keyof NewsItem, value: string) => {
    const updated = [...news];
    if (field === 'date') {
      updated[index] = { ...updated[index], date: BigInt(new Date(value).getTime() * 1000000) };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setNews(updated);
  };

  const removeNewsItem = (index: number) => {
    setNews(news.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5" />
          <CardTitle>Public Content Management</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Vision, Mission & Goals */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Vision, Mission & Goals</h3>

            <div className="space-y-2">
              <Label htmlFor="vision">Vision</Label>
              <Textarea
                id="vision"
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                rows={3}
                placeholder="Enter the academy's vision statement"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mission" className="flex items-center gap-2">
                Mission
                <Lock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-normal">(Read-only)</span>
              </Label>
              <Textarea
                id="mission"
                value={mission}
                disabled
                rows={3}
                className="bg-muted cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground">
                The mission statement is protected and cannot be edited through this form.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goals">Goals & Objectives</Label>
              <Textarea
                id="goals"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                rows={5}
                placeholder="Enter goals and objectives (one per line or separated by bullet points)"
              />
              <p className="text-xs text-muted-foreground">
                Tip: Enter each objective on a new line or use bullet points (•) to separate them.
              </p>
            </div>
          </div>

          <Separator />

          {/* Team Members */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Team Members</h3>
              <Button type="button" variant="outline" size="sm" onClick={addTeamMember}>
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </div>
            {team.map((member, index) => (
              <Card key={index}>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                      <Input
                        placeholder="Name"
                        value={member.name}
                        onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                      />
                      <Input
                        placeholder="Role"
                        value={member.role}
                        onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                      />
                      <Input
                        placeholder="Expertise"
                        value={member.expertise}
                        onChange={(e) => updateTeamMember(index, 'expertise', e.target.value)}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTeamMember(index)}
                      className="ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator />

          {/* News Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">News & Updates</h3>
              <Button type="button" variant="outline" size="sm" onClick={addNewsItem}>
                <Plus className="h-4 w-4 mr-2" />
                Add News
              </Button>
            </div>
            {news.map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 space-y-3">
                      <Input
                        placeholder="Title"
                        value={item.title}
                        onChange={(e) => updateNewsItem(index, 'title', e.target.value)}
                      />
                      <Textarea
                        placeholder="Content"
                        value={item.content}
                        onChange={(e) => updateNewsItem(index, 'content', e.target.value)}
                        rows={2}
                      />
                      <Input
                        type="date"
                        value={new Date(Number(item.date) / 1000000).toISOString().split('T')[0]}
                        onChange={(e) => updateNewsItem(index, 'date', e.target.value)}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeNewsItem(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button type="submit" className="w-full" disabled={updateContent.isPending}>
            {updateContent.isPending ? 'Saving...' : 'Save All Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
