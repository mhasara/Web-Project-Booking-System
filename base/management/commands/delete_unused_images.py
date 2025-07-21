import os
from pathlib import Path
from django.core.management.base import BaseCommand
from django.conf import settings
from django.apps import apps
from django.db.models import ImageField, FileField

class Command(BaseCommand):
    help = 'Find and delete unused images in the static folder that are not referenced in any database models'

    def handle(self, *args, **kwargs):
        # Adjust the static_dir to point directly to the folder where images are stored
        static_dir = Path(os.path.join(settings.BASE_DIR, 'static/images/products'))  # Adjust this path as needed
        image_extensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp']
        all_images = []

        for root, dirs, files in os.walk(static_dir):
            for file in files:
                if os.path.splitext(file)[1].lower() in image_extensions:
                    full_path = os.path.abspath(os.path.join(root, file))
                    all_images.append(full_path)
                    self.stdout.write(f"Found image in static: {full_path}")  # Debugging output

        self.stdout.write(f"Total images found in static folder: {len(all_images)}")

        # Step 2: Gather image references from all models with ImageField or FileField
        used_images = set()

        for model in apps.get_models():
            for field in model._meta.get_fields():
                if isinstance(field, (ImageField, FileField)):
                    # Get all instances of the model
                    for instance in model.objects.all():
                        file_field = getattr(instance, field.name)
                        if file_field and file_field.name:  # Check if the field has a file path
                            file_path = os.path.abspath(os.path.join(settings.MEDIA_ROOT, file_field.name))
                            used_images.add(file_path)
                            self.stdout.write(f"Referenced file in model: {file_path}")  # Debugging output

        self.stdout.write(f"Total images referenced in database models: {len(used_images)}")

        # Step 3: Identify and delete unused images
        for image in all_images:
            if image not in used_images:
                self.stdout.write(f"Unused image detected: {image}")  # Debugging output
                try:
                    os.remove(image)
                    self.stdout.write(f"Deleted: {image}")
                except Exception as e:
                    self.stderr.write(f"Failed to delete {image}: {e}")

        self.stdout.write("Unused images cleanup complete.")
