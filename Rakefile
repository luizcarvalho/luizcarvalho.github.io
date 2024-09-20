require 'rubygems'
require 'rake'
require 'yaml'
require 'time'
require 'pry'
require './_lib/asset'
require 'cloudinary'
include Asset

SOURCE = '.'.freeze

CONFIG = {
  'posts' => File.join(SOURCE, '_posts'),
  'post_ext' => 'md'
}.freeze

meses = {
  'January' => 'Janeiro', 'February' => 'Fevereiro', 'March' => 'Março',
  'April' => 'Abril', 'May' => 'Maio', 'June' => 'Junho',
  'July' => 'Julho', 'August' => 'Agosto', 'September' => 'Setembro',
  'October' => 'Outubro', 'November' => 'Novembro', 'December' => 'Dezembro'
}

# Usage: rake post title="A Title" [date="2012-02-09"] [tags=[tag1,tag2]] [category="category"]
desc 'rake post title="A Title"'
task :post do
  abort("rake aborted: '#{CONFIG['posts']}' directory not found.") unless FileTest.directory?(CONFIG['posts'])
  title = ENV['title'] || 'new-post'
  slug = title.downcase.strip.tr(' ', '_').gsub(/[^\w-]/, '')
  post_count = Dir["#{CONFIG['posts']}/*.md"].size
  date = Time.now.strftime('%Y-%m-%d')
  project_month = Time.now.strftime('%B')
  ano = Time.now.strftime('%Y')

  filename = File.join(CONFIG['posts'], "#{date}-#{slug}.#{CONFIG['post_ext']}")
  abort('post já existe!!') if File.exist?(filename)

  cdn_data = process_upload_cdn(title)

  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts '---'
    post.puts 'layout: default'
    post.puts "thumb_url: \"#{cdn_data[:thumb_url]}\""
    post.puts "optimized_url: \"#{cdn_data[:optimized_url]}\""
    post.puts "modal_id: #{post_count + 1}\n"
    post.puts "date: #{date}"
    post.puts "title: \"#{title}\""
    post.puts 'subtitle: '
    post.puts "img: \"#{slug}\""
    post.puts 'link: '
    post.puts "project_date: #{meses[project_month]} de #{ano}"
    post.puts 'prioridade: 0'
    post.puts 'client: '
    post.puts 'categories : []'
    post.puts 'description: '
    post.puts '---'
  end
end # task :post

namespace :assets do
  desc 'optimize png'
  task :optimize do
    Asset.optimize
  end
end

# Load custom rake scripts
Dir['./_lib/rake/*.rake'].each { |r| load r }
