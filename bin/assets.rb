require 'fileutils'
require 'bundler/setup'
require 'tinypng'
require 'mini_magick'
require 'pry'


images_path = "#{Dir.pwd}/img/portfolio/"
@client = TinyPNG::Client.new('JKBeITI8M4WBmkhBn8ejUgPNRUdGmTTP')


def get_base_name(path, sep)
  path.split(sep)[0]
end

def optmize(image_path, prefix)
  puts "Otimizing #{image_path}"
  image_file = File.open(image_path)
  image = @client.shrink(image_file.read)
  image_base_name = get_base_name(image_file.path,'.')
  destiny = "#{image_base_name}-#{prefix}.png"
  puts "Save in #{destiny}"
  image.to_file(destiny)
  File.delete(image_file)
  destiny
end


def resize(image_origin, size)
  puts "\ncreate thumb for #{image_origin}"
  image = MiniMagick::Image.open(image_origin)
  image.resize size
  temp_name = "#{get_base_name(image_origin, '-')}.png"
  puts "temp file: #{temp_name}"
  image.write temp_name
  temp_name
end


Dir["#{images_path}*.png"].each do |image| 
  unless image =~ /thumb|optimized/
    puts "\n\n #{'-' * 100}"
    optimized = optmize(image, 'optimized')
    thumb = resize(optimized, '400x289')
    optmize(thumb, 'thumb')
  end
end

