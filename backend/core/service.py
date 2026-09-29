from filer.models.foldermodels import Folder
from filer.models.filemodels import File as FilerFile


def get_filer_folder(folder_name):
    folder,created = Folder.objects.get_or_create(name=folder_name, parent = None)

    return folder


def move_file_to_folder(folder_name,filer_file):
    folder = get_filer_folder(folder_name)

    if filer_file.folder_id != folder.pk:
        filer_file.folder = folder
        filer_file.save(update_fields=['folder'])

    return filer_file

