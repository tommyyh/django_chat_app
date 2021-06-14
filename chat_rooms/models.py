from django.db import models

class Messages(models.Model):
  room = models.CharField(max_length=255)
  content = models.TextField()
  username = models.CharField(max_length=200)
  sent_at = models.DateField(auto_now_add=True)

  class Meta:
    ordering = ('sent_at',)

  def __str__(self):
    return self.content