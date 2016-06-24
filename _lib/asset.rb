require 'fileutils'
require 'bundler/setup'
require 'tinypng'
require 'mini_magick'
require 'dotenv'
# Modulo para otimizacao de imagens
module Asset
  Dotenv.load
  IMAGE_PATH = "#{Dir.pwd}/_assets/images/portfolio".freeze
  @client = TinyPNG::Client.new(ENV['TINYPNG_KEY'])

  AUTH = {
    cloud_name:ENV['CLOUD_NAME'],
    api_key:   ENV['API_KEY'],
    api_secret:ENV['API_SECRET']
  }

  def full_path(name, posfix=nil)
    "#{IMAGE_PATH}/#{name}#{'-' if posfix}#{posfix}.png"
  end

  def upload(image_path)
    puts ">> Upload #{image_path}"
    Cloudinary::Uploader.upload(image_path, AUTH)
  end

  def process_upload_cdn(name)
    processed = Asset.process(name)
    thumb = upload(processed[:thumb])
    optimized = upload(processed[:optimized])
    { thumb_url: thumb['url'], optimized_url: optimized['url'] }
  end

  def process(image, path = IMAGE_PATH)
    image_path = "#{path}/#{image}.png"
    image_resized = resize_image(image_path, '600x450')
    optimized = optmize_image(image_resized, 'optimized')
    optimized_resized = resize_image(optimized, '400x289')
    thumb = optmize_image(optimized_resized, 'thumb')
    { thumb: thumb, optimized: optimized }
  end

  def get_base_name(path, sep)
    path.split(sep)[0]
  end

  def optmize_image(image_path, posfix)
    puts "Otimizing #{image_path}"
    image_file = File.open(image_path)
    image = @client.shrink(image_file.read)
    image_base_name = get_base_name(image_file.path, '.')
    destiny = "#{image_base_name}-#{posfix}.png"
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
    Dir["#{IMAGE_PATH}/*.png"].map do |image|
      next if image =~ /thumb|optimized/
      puts "\n\n #{'-' * 100}"
      process(image)
    end
  end
end
