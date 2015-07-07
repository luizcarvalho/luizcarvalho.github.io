require 'fileutils'
require 'bundler/setup'
require 'tinypng'
require 'pry'


images_path = "#{Dir.pwd}/img/portfolio/"

Dir["#{images_path}*.png"].each do |image| 
  unless image =~ /thumb|optimized/
    puts "Otimizing #{image}"
    image_file = File.open(image)

    client = TinyPNG::Client.new('JKBeITI8M4WBmkhBn8ejUgPNRUdGmTTP')
    image = client.shrink(image_file.read)
    destiny = "#{image_file.path.split('.')[0]}-optimized.png"
    puts "Save in #{destiny}"

    image.to_file(destiny)

    image_file.close
  end
end

