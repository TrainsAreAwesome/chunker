# chunkifile
Allows you to split files into .chunk files so you can share large files regardless of size, and recombine them at the other side

## how to use
### downloading
first download nodejs which also downloads npm
also make sure git is installed
then clone the repo into your directory of choice

### chunking
run a terminal inside the same directory as chunkifile and run `node chunkify.js fileName chunkSize` where fileName is the file you want to chunkify.
chunckSize is an optional paramater which specifies the size of each .chunk file (by default its 25MB max per chunk file)

this will create a new directory (or overwrite an existing one) with .chunk files inside.
when you chunk a file, a command is listed to dechunk those files, save this for later along with the folder name it shows you, and send these along with the .chunk files
to whoever you want to be able to dechunk.
thats it!

### dechunking
go to the chunkifile directory and paste the .chunck files. then open a terminal in that directory, and run the dechunk command.
done! the file name of the dechunked file will be listed after dechunking finishes