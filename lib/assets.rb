require 'fileutils'
require 'bundler/setup'
require 'tinypng'
require 'mini_magick'
# Modulo para otimizacao de imagens
module Optimize
  IMAGE_PATH = "#{Dir.pwd}/assets/images/portfolio/".freeze
  @client = TinyPNG::Client.new('JKBeITI8M4WBmkhBn8ejUgPNRUdGmTTP')

  def get_base_name(path, sep)
    path.split(sep)[0]
  end

  def optmize_image(image_path, prefix)
    puts "Otimizing #{image_path}"
    image_file = File.open(image_path)
    image = @client.shrink(image_file.read)
    image_base_name = get_base_name(image_file.path, '.')
    destiny = "#{image_base_name}-#{prefix}.png"
    puts "Save in #{destiny}"
    image.to_file(destiny)
    File.delete(image_file)
    destiny
  end

  def resize_image(image_origin, size)
    puts "\ncreating thumb for #{image_origin}"
    image = MiniMagick::Image.open(image_origin)
    image.resize(size)
    temp_name = "#{get_base_name(image_origin, '-')}.png"
    puts "temp file: #{temp_name}"
    image.write temp_name
    temp_name
  end

  def optimize
    Dir["#{IMAGE_PATH}*.png"].each do |image|
      next if image =~ /thumb|optimized/
      puts "\n\n #{'-' * 100}"
      optimized = optmize_image(image, 'optimized')
      thumb = resize_image(optimized, '400x289')
      optmize_image(thumb, 'thumb')
    end
  end
end
